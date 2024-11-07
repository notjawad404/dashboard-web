import { FiUpload } from 'react-icons/fi';

export default function PDFParser() {
  return (
    <div className='px-10 py-10'>
        <section className='py-3'>
        <p>Question</p>
        <input type="text" value="Is water leakage covered in the policy? What is the maximum amount?" disabled className='p-2 rounded-lg w-full border border-blue-100 shadow-xl'/>
        </section>

        <section className='mt-5 mb-5'>
        <p className='text-gray-500'>Upload</p>
        <section className='flex flex-row'>
        <p className='pt-3'>Policy Pdf</p>
        <FiUpload size={50}  className='px-2'/>
        </section>

        <section className='my-10'>
            <p className='text-gray-500'>Response</p>
            <p>Based on the insurance policy details, water leakage is covered under the property damage section. The coverage includes repairs for damages directly caused by water leakage but excludes damages from gradual wear or lack of maintenance.
            Maximum Coverage Amount: $10,000 per incident, with an annual limit of $25,000.
            Please note that deductibles and exclusions may apply depending on the specific conditions listed in the policy.</p>
        </section>
        </section>
    </div>
  )
}
