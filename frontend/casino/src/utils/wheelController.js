export const wheelController= (deg, actualDegree, segment) => {
    if (deg.length> 0) {
        for (let i= 0; i< deg.length; i++) {
            const degree= parseInt(deg[i].degree); 
            const colorDegree= 360-degree;
            const spin= (360/segment)/2;

            if (Math.floor(actualDegree)>= colorDegree-spin && Math.floor(actualDegree)< colorDegree+spin) {
                return {
                    winValue: deg[i].winvalue,
                    winColor: deg[i].color
                }
            } else {
                if (actualDegree=== 0) {
                    return {
                        winValue: deg[0].winvalue,
                        winColor: deg[0].color
                    }
                }
            }
        }
    }
}