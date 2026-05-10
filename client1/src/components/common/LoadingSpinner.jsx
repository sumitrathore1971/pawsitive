export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[220px] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
    </div>
  );
}
