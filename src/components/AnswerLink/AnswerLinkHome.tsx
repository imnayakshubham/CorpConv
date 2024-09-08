import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { axiosInstance, getUrl } from '@/utils/sendApiRequest'
import { useSelector } from 'react-redux'
import { LoginWithGoogle } from '../LoginWithGoogle/LoginWithGoogle'

const AnswerLinkHome = () => {
    const loginResponse = useSelector((state: any) => state.login.loginResponse)
    const navigateTo = useNavigate()

    const askAquestion = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                token: `${loginResponse.token}`,
            },
        };
        const { data: { data } } = await axiosInstance.post(getUrl("question/create"), {}, config)
        if (data) {
            console.log({ data })
            navigateTo(`question/${data._id}`)
        }
    }

    return (
        <main className="container mx-auto py-12 px-4">
            <section className="mb-12 text-center">
                <h2 className="text-3xl font-semibold mb-4">Welcome to AnswerLink</h2>
                <p className="text-gray-700 text-lg">Your go-to platform for asking questions and getting answers from a community of experts and enthusiasts.</p>
            </section>

            <section className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg border">
                        <h4 className="text-xl font-bold mb-2">Ask Anything</h4>
                        <p className="text-gray-700">Post your questions and get answers from knowledgeable community members.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border">
                        <h4 className="text-xl font-bold mb-2">Real-Time Interaction</h4>
                        <p className="text-gray-700">Engage in real-time discussions and get instant responses to your queries.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border">
                        <h4 className="text-xl font-bold mb-2">Expert Community</h4>
                        <p className="text-gray-700">Connect with experts in various fields and tap into their knowledge.</p>
                    </div>
                </div>
            </section>

            <section className="flex gap-2 items-center w-full justify-center">
                {!!loginResponse?.token ?
                    <>
                        <Button onClick={() => askAquestion()} className=" bg-[#fff] text-black py-2 px-4 rounded-full font-bold border hover:bg-black hover:text-white ">Ask Question</Button>
                        <Link to="/answerlink/questions" className="bg-[#000] text-white py-2 px-4 rounded-full font-bold border hover:bg-[#fff] hover:text-black">View Questions</Link>
                    </>
                    : <LoginWithGoogle />
                }
            </section>
        </main>
    )
}

export default AnswerLinkHome
