interface Props {
  url: string
  method: string
  data: any
}

export const ResponseContainer: React.FC<Props> = ({ url, data, method }) => (
  <div className="bg-white text-white p-4 rounded-lg m-4">
    <div className="bg-black p-4 flex justify-between items-center overflow-x-auto">
      <pre>
        <span>{method}</span>
        <span> </span>
        <span>{url}</span>
      </pre>
    </div>
    <div className="text-xs bg-gray-900 overflow-x-auto p-4">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  </div>
)
