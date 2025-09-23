import Card from '../components/Card'

function Home() {
    return (
        <div className="flex flex-col">
            <h1 className="text-7xl font-bold py-15 px-20">iPhone</h1>
            <div className='flex flex-row px-20'>
                <Card />
            </div>
        </div>
    )
}

export default Home