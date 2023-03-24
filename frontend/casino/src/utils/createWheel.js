const width= (s) => {
    if (s=== 30) 
        return '33px';
    else if (s=== 20)
        return '50px';
    else if (s=== 50)
        return '19px';
    else 
        return '';
}
const height= (s) => {
    if (s=== 30) 
        return '143px';
    else if (s=== 20)
        return '135px';
    else if (s=== 50)
        return '150px';
    else 
        return '';
}

export const createWheel= (segment, risk, color) => {
    let degree= [];
    let array= [];
    let count= 0;

    for (let i= 0; i<= segment; i++) 
            array[i]= 0;


    if (risk=== 'Low') 
    {
        for (let i= 1; i<= segment; i++)
        {
            array[i]= 0;
        }

        const div= segment/10;
        const whiteSegment= 2*div;
        let segmentCount= 0;

        for (let j= 1; j<=segment; j= j+segment/whiteSegment)
        {
            if (array[j]=== 0) 
            {
                array[j]= <div key={j} style={{
                    width: `${width(segment)}`,
                    left: `${height(segment)}`,
                    backgroundColor: `${color.white}`,
                    transform: `rotate(${(360/segment) * (j-1)}deg)`
                }} className='segment1'>
                </div>
            }
        }

        for (let j= 1; j<= segment; j++)
        {
            if (array[j]!== 0) 
            {
                array[j+1]= <div key={j+1} style={{
                    width: `${width(segment)}`,
                    left: `${height(segment)}`,
                    backgroundColor: `${color.purple}`,
                    transform: `rotate(${(360/segment) * j}deg)`
                }} className='segment1'>
                </div>

                j= 2*(segment/whiteSegment) * (segmentCount+1);
                segmentCount++;

                if (segmentCount=== div)
                {
                    segmentCount= 0;
                    break;
                }
            }
        }

        for (let j= 1; j<= segment; j++)
        {
            if (array[j]=== 0) 
            {
                array[j]= <div key={j} style={{
                    width: `${width(segment)}`,
                    left: `${height(segment)}`,
                    backgroundColor: `${color.darkGold}`,
                    transform: `rotate(${(360/segment) * (j-1)}deg)`
                }} className='segment1'>
                </div>
            }
        }
    }

    else if (risk=== 'High')
    {
        for (let i= 1; i<=segment; i++)
        {
            if (i=== 1)
            {
                array[i]= <div key={i} style={{
                    width: `${width(segment)}`,
                    left: `${height(segment)}`,
                    backgroundColor: `${color.warning}`,
                    transform: `rotate(${(360/segment) * (i-1)}deg)`
                }} className='segment1'>
                </div>
            }

            else 
            {
                array[i]= <div key={i} style={{
                    width: `${width(segment)}`,
                    left: `${height(segment)}`,
                    backgroundColor: `${color.white}`,
                    transform: `rotate(${(360/segment) * (i-1)}deg)`
                }} className='segment1'>
                </div>
            }
        }
    }

    else 
    {
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
                </div>
            }
       }

       for (let k= 2; k<= segment; k= k+4)
       {
            if (array[k]=== 0)
            {
                array[k]= <div key={k} style={{
                    width: `${width(segment)}`,
                    left: `${height(segment)}`,
                    backgroundColor: `${color.purple}`,
                    transform: `rotate(${(360/segment) * (k-1)}deg)`
                }} className='segment1'>
                </div>
                count++;
            }

            if (count=== Math.floor((segment*20)/100))
            {
                count= 0;
                break;
            }
       }

       for (let m= 4; m<= segment; m++)
       {
            if (array[m]=== 0 && count=== 0)
            {
                array[m]= <div key={m} style={{
                    width: `${width(segment)}`,
                    left: `${height(segment)}`,
                    backgroundColor: `${color.darkGold}`,
                    transform: `rotate(${(360/segment) * (m-1)}deg)`
                }} className='segment1'>
                </div>
                count= 1;
            }

            if (array[m]=== 0 && count=== 1)
            {
                array[m]= <div key={m} style={{
                    width: `${width(segment)}`,
                    left: `${height(segment)}`,
                    backgroundColor: `${color.gold}`,
                    transform: `rotate(${(360/segment) * (m-1)}deg)`
                }} className='segment1'>
                </div>
                count= 2;
            }

            if (array[m]=== 0 && count=== 2)
            {
                array[m]= <div key={m} style={{
                    width: `${width(segment)}`,
                    left: `${height(segment)}`,
                    backgroundColor: `${color.warning}`,
                    transform: `rotate(${(360/segment) * (m-1)}deg)`
                }} className='segment1'>
                </div>
                count= 0;
            }
       } 
    }
    return {
        wheelData: array
   }
}