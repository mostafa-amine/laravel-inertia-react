import { Head, usePage } from "@inertiajs/react";
import { useForm } from '@inertiajs/react'
import { Switch } from '@headlessui/react'
import DashboardLayout from "../../../Layouts/DashboardLayout";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Edit() {
    const { userPost } = usePage().props

    const { data, setData, post, progress, errors } = useForm({
        title: userPost.title,
        content: userPost.content,
        thumbnail: userPost.thumbnail,
        is_published: userPost.is_published
    })


    function submit(e) {
        e.preventDefault()
        console.log(data)
        post(`/dashboard/posts/${userPost.id}`)
    }


    return (
        <DashboardLayout>
            <Head title="Update Post">
            </Head>

            <form onSubmit={submit} className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-10">

                <div className="mt-10">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label> <span className="text-red-600">{errors.title && <span>{errors.title}</span>}</span>
                        <div className="mt-1">
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                name="title"
                                id="title"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Thumbnail
                        </label>
                        <span className="text-red-600">{errors.thumbnail && <span>{errors.thumbnail}</span>}</span>
                        <div className="mt-1">
                            <input
                                type="file"
                                onChange={e => setData('thumbnail', e.target.files[0])}
                            />
                            {progress && (
                                <div
                                    className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    role="status">
                                    <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >Loading...
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>  <span className="text-red-600">{errors.content && <span>{errors.content}</span>}</span>
                        <div className="mt-1">
                            <textarea
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                id="content"
                                rows={6}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                            </textarea>
                        </div>
                    </div>
                </div>

                <label htmlFor="" className="me-3">Is Published</label>
                <Switch
                    checked={data.is_published}
                    onChange={() => setData('is_published', !data.is_published)}
                    className="group mt-10 relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <span className="sr-only">Use setting</span>
                    <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                    <span
                        aria-hidden="true"
                        className={classNames(
                            data.is_published ? 'bg-indigo-600' : 'bg-gray-200',
                            'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                        )}
                    />
                    <span
                        aria-hidden="true"
                        className={classNames(
                            data.is_published ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                        )}
                    />
                </Switch>
                <br />
                <button
                    type="submit"
                    className="mt-7 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Create
                </button>
            </form>
        </DashboardLayout>
    )
}
