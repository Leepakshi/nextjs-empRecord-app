export default function EmployeeDetailsPage({ params }) {
  const { id } = params;
  const empId = id;

  return (
    <div>
      <h1 className="text-2xl font-bold">Employee Details - {empId}</h1>;
    </div>
  );
}
