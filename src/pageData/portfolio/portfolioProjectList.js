import bmwX5 from '@/assets/portfolio/bmwX5'
import bmwX7 from '@/assets/portfolio/bmwX7'
import mercSClass from '@/assets/portfolio/mercSClass'
import mercEqs from '@/assets/portfolio/mercEqs'
import pTaykan from '@/assets/portfolio/pTaykan'
import pCayenne from '@/assets/portfolio/pCayenne'
import rollsRoyce from '@/assets/portfolio/rRoyceRS'
import pPanamera from '@/assets/portfolio/pPanamera'
import mercGClass from '@/assets/portfolio/mercGClass'

export const categories = [
    { key: 'all', label: 'Всички' },
    { key: 'ppf', label: 'PPF' },
    { key: 'tinting', label: 'Затъмняване' },
    { key: 'detailing', label: 'Детайлинг' },
]

export const projectsList = [
    {
        id: 'rr',
        title: 'Ролс Ройс РС',
        service: 'Цялостно Фолиране',
        category: 'ppf',
        cover: rollsRoyce.cover,
        highlights: ['Максимална защита', 'Самовъзстановащо Фолио'],
    },
    {
        id: 'eqs',
        title: 'Мерцедес EQS',
        service: 'Фолиране • Затъмняване',
        category: 'tinting',
        cover: mercEqs.cover,
        highlights: ['Фолиране - частично', 'Затъмняване - 70%'],
    },
    {
        id: 'sclass',
        title: 'Мерцедес S Class',
        service: 'Фолиране',
        category: 'ppf',
        cover: mercSClass.cover,
        highlights: ['Фолиране - Chrome Delete'],
    },
    {
        id: 'cayenne',
        title: 'Порше Кайен',
        service: 'Фолиране',
        category: 'ppf',
        cover: pCayenne.cover,
        highlights: ['Подмяна на фолио - предница'],
    },
    {
        id: 'taycan',
        title: 'Порше Тайкан',
        service: 'Фолиране',
        category: 'ppf',
        cover: pTaykan.cover,
        highlights: ['Фолиране - предница'],
    },
    {
        id: 'x7',
        title: 'БМВ Х7',
        service: 'Фолиране',
        category: 'ppf',
        cover: bmwX7.cover,
        highlights: ['Фолиране - подмяна', 'Chrome Matte'],
    },
    {
        id: 'x5',
        title: 'БМВ Х5',
        service: 'Фолиране',
        category: 'ppf',
        cover: bmwX5.cover,
        highlights: ['Фолиране - частично', 'предница'],
    },
    {
        id: 'pPan',
        title: 'Порше Панамера',
        service: 'Фолиране',
        category: 'ppf',
        cover: pPanamera.cover,
        highlights: ['Фолиране - частично', 'предница'],
    },
    {
        id: 'GClass',
        title: 'Мерцедес Г Класа',
        service: 'Фолиране',
        category: 'ppf',
        cover: mercGClass.cover,
        highlights: ['Фолиране - Мат', 'Матово фолио'],
    },
]
