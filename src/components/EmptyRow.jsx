

export  default function EmptyRow({ columns, message = "No data available", actionLabel, onAction }) {
  return (
    <tr>
      <td colSpan={columns} className="px-6 py-8 text-center  border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-500 text-lg">{message}</p>
          {actionLabel && onAction && (
            <Button onClick={onAction} variant="outline">
              {actionLabel}
            </Button>
          )}
        </div>
      </td>
    </tr>
  )
}
