using hospital_backend.Models;
using hospital_backend.Persistence;
using hospital_backend.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hospital_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicalRecordController : ControllerBase
    {
        private readonly HospitalDbContext _context;

        public MedicalRecordController(HospitalDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRecords()
        {
            var records = await _context.Records.Select(r => new
            {
                Patient = r.ExaminedPatient.Name + " " + r.ExaminedPatient.Surname,
                Doctor = r.ResponsibleDoctor,
                Date = r.DateOfExamination,
                Notes = r.ExaminationNotes
            }).ToListAsync();

            return Ok(records);
        }

        [HttpPost]
        public async Task<IActionResult> AddRecord([FromBody] MedicalRecordRequest recordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid create medical record model");
            }

            var patient = await _context.Patients.FindAsync(recordDto.ExaminedPatientId);
            if (patient == null)
            {
                return BadRequest($"Cannot create medical record with non-existing patient id = {recordDto.ExaminedPatientId}");
            }

            var record = new MedicalRecord
            {
                ExaminedPatient = patient,
                ResponsibleDoctor = recordDto.ResponsibleDoctor,
                DateOfExamination = DateTimeOffset.Now,
                ExaminationNotes = recordDto.ExaminationNotes
            };

            var newRecord = _context.Records.Add(record);
            await _context.SaveChangesAsync();

            return StatusCode(201, newRecord.Entity.Id);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateRecord([FromQuery] int id, [FromQuery] string examinationNotes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid update record model");
            }

            var existingRecord = await _context.Records.FindAsync(id);
            if (existingRecord == null)
            {
                return NotFound($"Medical record id = {id} to update does not exist");
            }

            existingRecord.ExaminationNotes = examinationNotes;

            var updatedRecord = _context.Records.Update(existingRecord);
            await _context.SaveChangesAsync();

            return Ok(updatedRecord.Entity.Id);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRecord([FromQuery] int id)
        {
            var existingRecord = await _context.Records.FindAsync(id);
            if (existingRecord == null)
            {
                return NotFound($"Medical record id = {id} to delete does not exist");
            }

            var deletedRecord = _context.Records.Remove(existingRecord);
            await _context.SaveChangesAsync();

            return Ok(deletedRecord.Entity.Id);
        }
    }
}
