const Header = ({ course }) => <h1>{course.name}</h1>;

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, { exercises }) => acc + exercises, 0);

  return <strong>total of {sum} exercises </strong>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <div key={part.id}>
            <Part part={part} />
          </div>
        );
      })}
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      <br />
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </>
  );
};

export default Course;
