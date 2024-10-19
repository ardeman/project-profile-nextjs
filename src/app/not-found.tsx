export default function NotFound() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center self-center">
      <div className="flex items-center justify-center">
        <h1 className="mr-5 inline-block border-r border-black border-opacity-30 pr-5 text-2xl font-semibold leading-10 dark:border-white">
          404
        </h1>
        <div className="inline-block">
          <h2 className="m-0 text-sm font-normal leading-10">
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  )
}
