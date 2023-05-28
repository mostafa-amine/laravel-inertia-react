
import { Head, useForm, usePage } from "@inertiajs/react";
import MainLayout from "../../Layouts/MainLayout";


export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        'name': '',
        'email': '',
        'password': '',
        'confirmPassword': '',
    });

    function handleSubmit(e) {
        e.preventDefault()
        post('/register')
    }
    return (
        <MainLayout>
            <Head title="Register"></Head>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 mt-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label> <span className="text-red-800">{errors.name}</span>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        name="name"
                                        type="text"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label> <span className="text-red-800">{errors.email}</span>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label> <span className="text-red-800">{errors.password}</span>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label> <span className="text-red-800">{errors.confirmPassword}</span>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        value={data.confirmPassword}
                                        onChange={e => setData('confirmPassword', e.target.value)}
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
