
export default function CustomerDebt() {
  return (
    <div className='px-10 py-10'>
        <section className='py-3'>
        <p>NIF</p>
        <input type="text" value="1234567890" disabled className='p-2 rounded-lg w-full border border-blue-100 shadow-xl'/>
        </section>

        <section className='mt-5 mb-5'>
        <p className='text-gray-500'>Updated</p>
        <section className='flex flex-row'>
        <p className='pt-3 font-semibold'>Social Security</p>
        </section>

        <section className='my-10'>
            <p className='text-gray-500'>Updated</p>
            <p className=" font-semibold">Finances</p>
        </section>
        </section>
    </div>
  )
}
