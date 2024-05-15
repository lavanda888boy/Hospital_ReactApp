using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace hospital_backend.Models
{
    public class MedicalRecord
    {
        [Column("RecordId")]
        public int Id { get; set; }

        public required Patient ExaminedPatient { get; set; }

        [MinLength(10)]
        [MaxLength(30)]
        public required string ResponsibleDoctor { get; set; }

        public required DateTimeOffset DateOfExamination { get; set; }

        [MinLength(10)]
        [MaxLength(250)]
        public required string ExaminationNotes { get; set; }
    }
}
