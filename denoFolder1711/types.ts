export type Teacher = {
    id: string,
    name: string,
    email: string,
    subjects: Array<Omit<Subject, "teacher" | "students">>,
}

export type Subject = {
    id: string,
    name: string,
    year: number,
    teacher: Omit<Teacher, "subjects">,
    students: Array<Omit<Student, "subjects">>,
}

export type Student = {
    id: string,
    name: string,
    email: string,
    subjects: Array<Omit<Subject, "students" | "teacher">>,
}