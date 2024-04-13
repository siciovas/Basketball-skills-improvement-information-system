namespace Basketball.Core.Email
{
    public static class EmailTemplates
    {
        public static Dictionary<string, string[]> Templates { get; } = new Dictionary<string, string[]>
        {
            { "CoachRegistration", ["Nauja trenerio registracija", "Gauta nauja trenerio registracija: {0} {1}\r\n\r\nPeržiūrėkite profilį ir atlikite veiksmus: {2}"] },
            { "CoachComplaint", ["Naujas skundas apie trenerį", "Gautas naujas skundas apie trenerį: {0} {1}\r\n\r\nPeržiūrėkite profilį ir atlikite veiksmus: {2}"] },
            { "Approved", ["Paskyros patvirtinimas", "Jūsų paskyra sėkmingai patvirtinta!\r\nPrisijunkite jau dabar ir atlikite veiksmus: {0}"] },
            { "Blocked", ["Užblokuota paskyra", "Jūsų paskyra buvo užblokuota dėl netinkamų veiksmų!"] },
            { "Unblocked", ["Atblokuota paskyra", "Jūsų paskyra buvo atblokuota. Prisijunkite ir atlikite veiksmus: {0}"] },
            { "PasswordRecovery", ["Paskyros atkūrimas", "Jūsų paskyros atkūrimo nuoroda: {0}"] }
        };
    }
}
