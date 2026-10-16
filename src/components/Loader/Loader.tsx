export default function Loader() {
  return (
    <div
      className="mx-auto my-10 flex w-full max-w-[600px] items-center justify-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-center text-base text-blue-800"
      role="status"
    >
      <span
        className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
        aria-hidden="true"
      />
      <span>Loading, please wait...</span>
    </div>
  );
}
