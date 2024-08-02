import { createObjectCsvStringifier } from 'csv-writer'

export default function createCSV(records) {
  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: 'full_name', title: 'Nombre completo' },
      { id: 'user', title: 'Usuario' },
      { id: 'password', title: 'Contraseña' }
    ]
  })

  const csvData =
    csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records)

  return Buffer.from(csvData, 'utf-8').toString()
}
