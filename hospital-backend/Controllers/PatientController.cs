using hospital_backend.Models;
using hospital_backend.Persistence;
using hospital_backend.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hospital_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly HospitalDbContext _context;

        public PatientController(HospitalDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await _context.Patients.ToListAsync();
            return Ok(patients);
        }

        [HttpPost]
        public async Task<IActionResult> AddPatient([FromBody] PatientRequestDto patientDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid create patient model");
            }

            var patient = new Patient
            {
                Name = patientDto.Name,
                Surname = patientDto.Surname,
                Age = patientDto.Age,
                Gender = Enum.Parse<Gender>(patientDto.Gender),
                Illnesses = patientDto.Illnesses
            };

            var newPatient = _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return StatusCode(201, newPatient.Entity.Id);
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePatient([FromQuery] int id, [FromBody] PatientRequestDto patientDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid update patient model");
            }

            var existingPatient = await _context.Patients.FindAsync(id);
            if (existingPatient == null)
            {
                return NotFound($"Patient id = {id} to update does not exist");
            }

            existingPatient.Name = patientDto.Name;
            existingPatient.Surname = patientDto.Surname;
            existingPatient.Age = patientDto.Age;
            existingPatient.Gender = Enum.Parse<Gender>(patientDto.Gender);
            existingPatient.Illnesses = patientDto.Illnesses;

            var updatedPatient = _context.Patients.Update(existingPatient);
            await _context.SaveChangesAsync();

            return Ok(updatedPatient.Entity.Id);
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePatient([FromQuery] int id)
        {
            var existingPatient = await _context.Patients.FindAsync(id);
            if (existingPatient == null)
            {
                return NotFound($"Patient id = {id} to delete does not exist");
            }

            var deletedPatient = _context.Patients.Remove(existingPatient);
            await _context.SaveChangesAsync();

            return Ok(deletedPatient.Entity.Id);
        }
    }
}
