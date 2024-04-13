namespace Basketball.Core.Dtos
{
    public class NewPasswordRecoveryDto
    {
        public required string Password { get; set; }
        public required string ConfirmPassword { get; set; }
    }
}
