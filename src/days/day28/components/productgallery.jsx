import { useEffect, useState, memo } from "react";

export const ProductGallery = memo(({productImages, productName}) => {
    const [selectedIndex, setSelectedIndex] = useState(null)
    useEffect(() => {
        console.log(selectedIndex)
    }, [selectedIndex])
    console.log('ProductGallery rendered');
    return (
        <div className="flex gap-6">
            <div className="flex flex-col gap-4" >
                {productImages.map((image, index) => (
                    <img 
                        src={image} 
                        alt={`${productName} view ${index + 1}`} 
                        key={index} 
                        onClick={() => setSelectedIndex(index + 1)}
                        className="object-cover w-2xs cursor-pointer rounded-md"
                        style={{border: (selectedIndex - 1) === index ? '2px solid #4f46e5' : '2px solid transparent'}}
                    />
                ))}
            </div>
            
            { selectedIndex && <img src={productImages[selectedIndex - 1]} alt={`${productName}`} className="object-cover rounded-lg size-96" /> }
                
        </div>
    )
})