import { useEffect, useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { ResponseContainer } from 'src/components/ResponseContainer'
import { ExternalLink } from 'src/components/ExternalLink'
import { useRequest } from 'src/request'

const Index: React.FC = () => {
  const router = useRouter()
  const request = useRequest()
  const inputRef = useRef<HTMLInputElement>(null)
  const queryUrl = router.query.url as string

  const onClickSend = () => {
    const url = inputRef.current.value
    if (!url) return
    router.replace({
      pathname: '/',
      query: {
        url,
      },
    })
  }

  useEffect(() => {
    if (!queryUrl) return
    inputRef.current.value = queryUrl
    request.send(queryUrl)
  }, [router])

  return (
    <>
      <Head>
        <title>Fetcher</title>
      </Head>
      <div className="flex flex-col justify-between min-h-screen bg-gradient-to-r from-green-500 to-blue-500">
        <div>
          <nav className="p-6 flex justify-between">
            <strong className="text-4xl text-white">Fetcher {'{ }'}</strong>
            <div>
              <ExternalLink
                className="font-bold text-white"
                href="https://github.com/phumoonlight/fetcher"
                children="GitHub"
              />
            </div>
          </nav>
          <div className="grid grid-cols-1 gap-4 justify-items-center my-4 mx-4">
            <input
              className="p-3 font-mono text-2xl rounded-xl w-full max-w-4xl transition-shadow shadow-xl focus:shadow-2xl focus:outline-none"
              type="text"
              placeholder="URL"
              ref={inputRef}
            />
            <button
              className="p-3 uppercase rounded-xl w-full max-w-4xl transition-all shadow-xl focus:shadow-2xl bg-purple-500 hover:bg-purple-400 font-bold tracking-widest focus:outline-none"
              onClick={onClickSend}
              disabled={request.isLoading}
            >
              <span className="text-2xl text-white">
                {request.isLoading ? 'loading...' : 'send'}
              </span>
            </button>
          </div>
          {request.isRequestError && (
            <div className="text-red-500 bg-red-100 m-4 p-4 rounded-lg font-mono">
              <div className="mb-4 font-bold text-xl">Request Error</div>
              <div className="text-xs break-words overflow-x-auto p-4">
                <pre>{JSON.stringify(request.error, null, 2)}</pre>
              </div>
            </div>
          )}
          {request.responseData && (
            <ResponseContainer
              data={request.responseData}
              method={request.method}
              url={queryUrl}
            />
          )}
        </div>
        <footer className="bg-purple-700 p-4 text-white">
          <pre>{'</> by @phumoonlight'}</pre>
        </footer>
      </div>
    </>
  )
}

export default Index
