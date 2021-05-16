import Pagination from 'components/Pagination';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useEffect, useState } from "react";
import api from "services/api";
import { SalePage } from "types/sale";

const DataTable = () => {
    const [activePage, setActivePage] = useState(0)
    const [page, setPage] = useState<SalePage>({
        first: true,
        last: true,
        totalPages: 0,
        totalElements: 0,
        number: 0,
    })

    useEffect(() => {
        api.get(`/sales?page=${activePage}&size=10&sort=date,desc`)
            .then(response => {
                setPage(response.data)
            })
    }, [activePage])

    const pageChange = (index: number) => {
        setActivePage(index)
    }

    const formatDate = (date: string) => {
        const dt = new Date(date)
        return format(dt, 'P', {
            locale: ptBR,
        });
    }

    return (
        <>
            <Pagination 
                page={page}
                paginationChange={pageChange}
            />
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Vendedor</th>
                            <th>Clientes visitados</th>
                            <th>Negócios fechados</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {page.content?.map(item => (
                            <tr key={item.id}>
                                <td>{formatDate(item.date)}</td>
                                <td>{item.seller.name}</td>
                                <td>{item.visited}</td>
                                <td>{item.deals}</td>
                                <td>{item.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                            </tr>
                        ))}
                            
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DataTable;