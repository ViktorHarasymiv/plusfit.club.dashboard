export function calculateAge(birthDateString) {
  if (!birthDateString) return 0;

  const birthDate = new Date(birthDateString);
  if (isNaN(birthDate.getTime())) return 0; // некоректна дата

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
}
