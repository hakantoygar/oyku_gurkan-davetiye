using Microsoft.AspNetCore.Mvc;
using Noir.API.Services;
using System.Globalization;
using System.Text;

namespace Noir.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OykuGurkanController : ControllerBase
{
private readonly IGoogleDriveService _googleDriveService;
// private readonly IGoogleSheetsService _googleSheetsService;
private readonly IConfiguration _configuration;
private readonly ILogger<OykuGurkanController> _logger;

    private static readonly string[] AllowedExtensions =
    {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    };

    private static readonly string[] AllowedContentTypes =
    {
        "image/jpeg",
        "image/png",
        "image/webp"
    };

public OykuGurkanController(
    IGoogleDriveService googleDriveService,
    // IGoogleSheetsService googleSheetsService,
    IConfiguration configuration,
    ILogger<OykuGurkanController> logger)
{
    _googleDriveService = googleDriveService;
    // _googleSheetsService = googleSheetsService;
    _configuration = configuration;
    _logger = logger;
}

    [HttpPost("photos")]
    [RequestSizeLimit(250 * 1024 * 1024)]
    public async Task<IActionResult> UploadPhotos(
        [FromForm] List<IFormFile> photos,
        [FromForm] string? guestName)
    {
        try
        {
            if (photos == null || photos.Count == 0)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "En az bir fotoğraf gönderilmelidir."
                });
            }

            if (string.IsNullOrWhiteSpace(guestName))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Lütfen adınızı giriniz."
                });
            }

            var maxFiles = _configuration
                .GetValue<int?>("UploadSettings:MaxFiles") ?? 20;

            var maxFileSizeMb = _configuration
                .GetValue<int?>("UploadSettings:MaxFileSizeMb") ?? 10;

            var maxFileSize = maxFileSizeMb * 1024L * 1024L;

            if (photos.Count > maxFiles)
            {
                return BadRequest(new
                {
                    success = false,
                    message = $"En fazla {maxFiles} fotoğraf yükleyebilirsiniz."
                });
            }

            var rootFolderId = _configuration["GoogleDrive:RootFolderId"];

            if (string.IsNullOrWhiteSpace(rootFolderId))
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "GoogleDrive:RootFolderId yapılandırılmamış."
                });
            }

            var cleanGuestName = CleanGuestName(guestName);

            if (string.IsNullOrWhiteSpace(cleanGuestName))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Geçerli bir isim giriniz."
                });
            }

            var uploadDate = DateTime.Now.ToString(
                "yyyyMMdd_HHmmss",
                CultureInfo.InvariantCulture);

            var uploadedFiles = new List<object>();

            var photoIndex = 1;

            foreach (var photo in photos)
            {
                if (photo == null || photo.Length == 0)
                {
                    continue;
                }

                if (photo.Length > maxFileSize)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message =
                            $"{photo.FileName} dosyası {maxFileSizeMb} MB sınırını aşıyor."
                    });
                }

                var extension = Path.GetExtension(photo.FileName)
                    .ToLowerInvariant();

                if (!AllowedExtensions.Contains(extension))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message =
                            $"{photo.FileName} desteklenmeyen bir dosya türüdür."
                    });
                }

                if (!AllowedContentTypes.Contains(
                        photo.ContentType.ToLowerInvariant()))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message =
                            $"{photo.FileName} geçersiz içerik türüne sahip."
                    });
                }

                var newFileName =
                    $"{cleanGuestName}_{uploadDate}_{photoIndex}{extension}";

                var renamedPhoto = new FormFile(
                    photo.OpenReadStream(),
                    0,
                    photo.Length,
                    photo.Name,
                    newFileName)
                {
                    Headers = photo.Headers,
                    ContentType = photo.ContentType,
                    ContentDisposition = photo.ContentDisposition
                };

                var fileId =
                    await _googleDriveService.UploadFileAsync(
                        renamedPhoto,
                        rootFolderId);

                uploadedFiles.Add(new
                {
                    fileName = newFileName,
                    fileId = fileId,
                    driveUrl =
                        $"https://drive.google.com/file/d/{fileId}/view"
                });

                photoIndex++;
            }

            return Ok(new
            {
                success = true,
                message =
                    $"{uploadedFiles.Count} fotoğraf başarıyla yüklendi.",
                guestName = guestName,
                files = uploadedFiles
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Fotoğraf yükleme sırasında hata oluştu.");

            return StatusCode(500, new
            {
                success = false,
                message = ex.Message,
                innerException = ex.InnerException?.Message
            });
        }
    }

    private static string CleanGuestName(string value)
    {
        value = value.Trim();

        value = value
            .Replace("ı", "i")
            .Replace("İ", "I")
            .Replace("ğ", "g")
            .Replace("Ğ", "G")
            .Replace("ü", "u")
            .Replace("Ü", "U")
            .Replace("ş", "s")
            .Replace("Ş", "S")
            .Replace("ö", "o")
            .Replace("Ö", "O")
            .Replace("ç", "c")
            .Replace("Ç", "C");

        var normalized = value.Normalize(NormalizationForm.FormD);

        var builder = new StringBuilder();

        foreach (var character in normalized)
        {
            var category =
                CharUnicodeInfo.GetUnicodeCategory(character);

            if (category == UnicodeCategory.NonSpacingMark)
            {
                continue;
            }

            if (char.IsLetterOrDigit(character))
            {
                builder.Append(character);
            }
            else if (
                char.IsWhiteSpace(character) ||
                character == '_' ||
                character == '-')
            {
                builder.Append('_');
            }
        }

        var result = builder.ToString();

        while (result.Contains("__"))
        {
            result = result.Replace("__", "_");
        }

        return result.Trim('_');
    }

// [HttpPost("message")]
// public async Task<IActionResult> SaveMessage(
//     [FromBody] MessageRequest request)
// {
//     try
//     {
//         if (request == null)
//         {
//             return BadRequest(new
//             {
//                 success = false,
//                 message = "Geçersiz istek."
//             });
//         }

//         if (string.IsNullOrWhiteSpace(request.GuestName))
//         {
//             return BadRequest(new
//             {
//                 success = false,
//                 message = "Lütfen adınızı giriniz."
//             });
//         }

//         if (string.IsNullOrWhiteSpace(request.Message))
//         {
//             return BadRequest(new
//             {
//                 success = false,
//                 message = "Lütfen mesajınızı giriniz."
//             });
//         }

//         var guestName =
//             request.GuestName.Trim();

//         var message =
//             request.Message.Trim();

//         if (guestName.Length > 100)
//         {
//             return BadRequest(new
//             {
//                 success = false,
//                 message = "İsim en fazla 100 karakter olabilir."
//             });
//         }

//         if (message.Length > 1000)
//         {
//             return BadRequest(new
//             {
//                 success = false,
//                 message = "Mesaj en fazla 1000 karakter olabilir."
//             });
//         }

//         await _googleSheetsService.AppendMessageAsync(
//             guestName,
//             message);

//         return Ok(new
//         {
//             success = true,
//             message = "Mesajınız başarıyla kaydedildi."
//         });
//     }
//     catch (Exception ex)
//     {
//         _logger.LogError(
//             ex,
//             "Google Sheets mesaj kaydı sırasında hata oluştu.");

//         return StatusCode(500, new
//         {
//             success = false,
//             message =
//                 "Mesaj kaydedilirken bir hata oluştu."
//         });
//     }
// }

public class MessageRequest
{
    public string GuestName { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;
}

}