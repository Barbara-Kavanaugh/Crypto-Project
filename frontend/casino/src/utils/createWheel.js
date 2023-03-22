const width= (s) => {
    if (s=== 30) 
        return '50px';
    else if (s=== 40)
        return '33px';
    else if (s=== 50)
        return '19px';
    else 
        return '';
}
const height= (s) => {
    if (s=== 30) 
        return '135px';
    else if (s=== 40)
        return '143px';
    else if (s=== 50)
        return '150px';
    else 
        return '';
}

export const createWheel= (segment, risk, color) => {
    let degree= [];
    let array= [];
    let count= 0;

    if (risk=== 'Low') 
    {

    }

    else if (risk=== 'High')
    {

    }

    else 
    {
       for (let i= 0; i<= segment; i++) 
            array[i]= 0;

       for (let j= 1; j<= segment; j=j+2)
       {
            if (array[j]=== 0)
            {
                array[j]= <div key={j} style={{
                    width: `${width(segment)}`,
                    left: `${height(segment)}`,
                    backgroundColor: `${color.white}`,
                    transform: `rotate(${(360/segment) * (j-1)}deg)`
                }} className='segment1'>
                    {j}
                </div>
            }
       }

       return {
            wheelData: array
       }
    }
}