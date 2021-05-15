import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useEffect, useState } from "react";
import api from "services/api";
import { SalePage } from "types/sale";

const DataTable = () => {
    const [page, setPage] = useState<SalePage>({
        first: true,
        last: true,
        totalPages: 0,
        totalElements: 0,
        number: 0,
    })

    useEffect(() => {
        api.get('/sales?page=0&size=10&sort=date,desc')
            .then(response => {
                setPage(response.data)
            })
    }, [])

    const formatDate = (date: string) => {
        const dt = new Date(date)
        return format(dt, 'P', {
            locale: ptBR,
        });
    }

    return (
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
                        <td>{item.amount.toFixed(2)}</td>
                    </tr>
                ))}
                    
            </tbody>
        </table>
    </div>
    )
}

export default DataTable;