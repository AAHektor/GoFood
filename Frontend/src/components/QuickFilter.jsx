import React from 'react'

const categories = [
    {id: 'popular', name: 'Populärt' },
    {id: 'burger', name: 'Burgare'},
    {id: 'pizza', name: 'Pizza'},
    {id: 'sushi', name: 'Sushi'},
    {id: 'asian', name: 'Asiatiskt'},
    {id: 'vegan', name: 'Vegitariskt'},
    {id: 'dessert', name: 'Efterrätt'},
];

const QuickFilter = ({ activeCategory, setActiveCategory}) => {


  return (
    <div className='px-4 py-2 flex gap-4 overflow-x-auto scrollbar-hide'>
        {categories.map((category) => (
            <button
                key={category.id}
                onClick={ () => setActiveCategory(category.id)}

                className={`
                        px-6 py-3 rounded-full text-sm font-bold outline-1 outline-slate-200/60 transition-all duration-300 ease-in-out
                        ${activeCategory === category.id
                            ? 'bg-green-600 text-white shadow-2xl shadow-green-600 outline-none'
                            : 'bg-white text-gray-700'
                        }
                    `}
            >
                {category.name}
            </button>
        ))}



    </div>
  )
}

export default QuickFilter