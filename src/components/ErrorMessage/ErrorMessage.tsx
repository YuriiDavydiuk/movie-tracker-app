export default function ErrorMessage() {
  return (
    <p
      className="mx-auto my-10 w-full max-w-[600px] rounded-md border border-red-200 bg-red-50 px-4 py-3 text-center text-base text-red-800 wrap-anywhere"
      role="alert"
    >
      There was an error, please try again...
    </p>
  );
}
