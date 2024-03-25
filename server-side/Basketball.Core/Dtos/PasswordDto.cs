namespace Basketball.Core.Dtos
{
    public class PasswordDto
    {
        public required string OldPassword { get; set; }
        public required string NewPassword { get; set; }
        public required string RepeatPassword { get; set; }
    }
}
