function Card({ imageUrl, onClick }) {

    return (
        <>
        <div
          className="h-16 w-16 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-xl font-bold shadow-md"
          onClick={onClick}
          
        >
          <img src={imageUrl} alt="gif" className="w-full h-full object-contain" />
        </div>
        </>
    )
}

export default Card;