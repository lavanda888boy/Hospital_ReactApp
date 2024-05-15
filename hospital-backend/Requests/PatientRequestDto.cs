using System.ComponentModel.DataAnnotations;

namespace hospital_backend.Requests
{
    public class PatientRequestDto
    {
        [MinLength(1)]
        [MaxLength(50)]
        public required string Name { get; set; }

        [MinLength(1)]
        [MaxLength(50)]
        public required string Surname { get; set; }

        [Range(1, 150)]
        public required int Age { get; set; }

        [MaxLength(7)]
        public required string Gender { get; set; }

        public List<string> Illnesses { get; set; } = [];
    }
}
