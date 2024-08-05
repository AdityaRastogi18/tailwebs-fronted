export function handleStudentData(student) {
  const { firstName, lastName, rollNum, subjects } = student;

  return subjects.map((subject) => {
    const { name: subjectName, marks: subjectMarks } = subject;
    return {
      name: firstName,
      rollNum: rollNum,
      subjectName,
      subjectMarks,
    };
  });
}
