function dateOperations(params) {
    const { date1, date2, daysToAdd, targetTimeZone, format } = params;

    // Calcular a diferença entre duas datas e adicionar dias convertendo ate milisegundos
    const daysBetween = Math.abs((new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24));

    const newDate = new Date(date1);
    // Adicionar dias
    newDate.setDate(newDate.getDate() + daysToAdd);

    // Converter para uma nova timezone
    const convertedTimeZone = new Intl.DateTimeFormat('pt-BR', { timeZone: targetTimeZone }).format(new Date(date1));

    // Formatar a data
    const formattedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: format }).format(new Date(date1));

    return {
        daysBetween: daysBetween,
        newDate: newDate.toISOString().split('T')[0],
        convertedTimeZone: convertedTimeZone,
        formattedDate: formattedDate
    };
}
const params = {
    date1: '2023-10-01',
    date2: '2023-10-10',
    daysToAdd: 5,
    targetTimeZone: 'America/Sao_Paulo',
    format: 'long'
};

console.log(dateOperations(params));