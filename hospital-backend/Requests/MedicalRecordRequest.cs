using System.ComponentModel.DataAnnotations;

namespace hospital_backend.Requests
{
    public class MedicalRecordRequest
    {
        [Range(1, 30)]
        public required int ExaminedPatientId { get; set; }

        [MinLength(10)]
        [MaxLength(30)]
        public required string ResponsibleDoctor { get; set; }

        [MinLength(10)]
        [MaxLength(250)]
        public required string ExaminationNotes { get; set; }
    }
}
