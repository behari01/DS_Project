namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string statusMessage, string details = null)
        {
            StatusCode = statusCode;
            StatusMessage = statusMessage;
            Details = details;
        }

        public int StatusCode { get; set; }

        public string StatusMessage { get; set; }

        public string Details { get; set; }
    }
}