function convertNumberToWords(number) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        console.log(number);
        // o sistema não aceitava uma requisição de localhost (talvez faça parte do teste), então usei um proxy para fazer a requisição 
       
        var url = "https://cors-anywhere.herokuapp.com/https://www.dataaccess.com/webservicesserver/NumberConversion.wso";
        // talvez seja preciso validar o proxy em: https://cors-anywhere.herokuapp.com/corsdemo

        // exemplo de solicitação como explicado em: https://www.dataaccess.com/webservicesserver/NumberConversion.wso?op=NumberToWords
        var soapRequest =
            `<?xml version="1.0" encoding="utf-8"?>
            <soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                <soap12:Body>
                    <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
                        <ubiNum>${number}</ubiNum>
                    </NumberToWords>
                </soap12:Body>
            </soap12:Envelope>`;
        
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/soap+xml; charset=utf-8");
        
        xhr.onreadystatechange = function () {
            // verificações de respostas e status da solicitação
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var responseXML = xhr.responseXML;
                    console.log(responseXML); // Log da resposta completa
                    var resultElement = responseXML.getElementsByTagNameNS("http://www.dataaccess.com/webservicesserver/", "NumberToWordsResult")[0];
                    if (resultElement) {
                        var result = resultElement.textContent;
                        console.log("Número em palavras:", result);
                        resolve(result);
                    } else {
                        console.error("Elemento 'NumberToWordsResult' não encontrado na resposta.");
                        reject("Elemento 'NumberToWordsResult' não encontrado na resposta.");
                    }
                } else {
                    console.error("Erro na requisição SOAP:", xhr.statusText);
                    reject("Erro na requisição SOAP: " + xhr.statusText);
                }
            }
        };
        
        xhr.send(soapRequest);
    });
}

// function processMatrix(matrix) {

//     console.log("matriz de Exemplo: ", matrix);
//     let sumRows = [];
//     let sumColumns = Array(matrix[0].length).fill(0);
//     let diagonalPrincipal = 0;
//     let diagonalSecundaria = 0;

//     for (let i = 0; i < matrix.length; i++) {
//         let rowSum = 0;
//         for (let j = 0; j < matrix[i].length; j++) {
//             rowSum += matrix[i][j];
//             sumColumns[j] += matrix[i][j];
//             if (i === j) {
//                 diagonalPrincipal += matrix[i][j];
//             }
//             if (i + j === matrix.length - 1) {
//                 diagonalSecundaria += matrix[i][j];
//             }
//         }
//         sumRows.push(rowSum);
//     }

//     return {
//         sumRows: sumRows,
//         sumColumns: sumColumns,
//         diagonalPrincipal: diagonalPrincipal,
//         diagonalSecundaria: diagonalSecundaria
//     };
// }

// function dateOperations(params) {
//     const { date1, date2, daysToAdd, targetTimeZone, format } = params;

//     // Calcular a diferença entre duas datas
//     const daysBetween = Math.abs((new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24));

//     // Adicionar dias a uma data
//     const newDate = new Date(date1);
//     newDate.setDate(newDate.getDate() + daysToAdd);

//     // Converter para outro fuso horário
//     const convertedTimeZone = new Intl.DateTimeFormat('pt-BR', { timeZone: targetTimeZone }).format(new Date(date1));

//     // Formatar data
//     const formattedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: format }).format(new Date(date1));

//     return {
//         daysBetween: daysBetween,
//         newDate: newDate.toISOString().split('T')[0],
//         convertedTimeZone: convertedTimeZone,
//         formattedDate: formattedDate
//     };
// }



// Uso da função com Promises para teste de integração
// convertNumberToWords(58).then(result => {
//     console.log("Resultado da Promise:", result);
// }).catch(error => {
//     console.error("Erro:", error);
// });
