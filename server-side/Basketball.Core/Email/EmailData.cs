﻿namespace Basketball.Core.Email
{
    public class EmailData
    {
        public string Subject { get; set; } = null!;
        public string Content { get; set; } = null!;
        public string[] Recipients { get; set; } = [];
    }
}
