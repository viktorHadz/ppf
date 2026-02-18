// To ONLY be used in "/portfolio/:id". Avoids huge load in /portfolio 

export const projectLoaders = {
    rr: () => import('@/assets/portfolio/rRoyceRS'),
    eqs: () => import('@/assets/portfolio/mercEqs'),
    sclass: () => import('@/assets/portfolio/mercSClass'),
    cayenne: () => import('@/assets/portfolio/pCayenne'),
    taycan: () => import('@/assets/portfolio/pTaykan'),
    x7: () => import('@/assets/portfolio/bmwX7'),
    x5: () => import('@/assets/portfolio/bmwX5'),
    pPan: () => import('@/assets/portfolio/pPanamera'),
    GClass: () => import('@/assets/portfolio/mercGClass'),
}