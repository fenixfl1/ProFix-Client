import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import autoTable from "jspdf-autotable"
import { getSessionInfo } from "@/lib/session"
import formatter from "./formatter"
import moment from "moment"
import { Receipt } from "@/interfaces/repair"

export interface ExportProps<T> {
  data: T[]
  filename?: string
  showHead?: boolean
  ref?: React.RefObject<HTMLTableElement>
  columnsMap?: Record<string, string>
  orientation?: "portrait" | "landscape"
  title?: string
}

const detectFormat = (value: any): string | undefined => {
  if (
    typeof value === "string" &&
    /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/.test(value)
  ) {
    return "dd/mm/yyyy hh:mm"
  }
  if (typeof value === "string") {
    const hasCommas = /,/.test(value)
    const numericValue = parseFloat(value.replace(/,/g, ""))
    if (!isNaN(numericValue)) {
      if (!hasCommas && Number.isInteger(numericValue)) return "0"
      if (!hasCommas) return "#,##0"
      return "#,##0.00"
    }
  }
  if (typeof value === "number") {
    return Number.isInteger(value) ? "0" : "#,##0"
  }
  return undefined
}

/**
 * This function takes a json object and returns a promise that resolves to a blob object containing the excel file.
 * @param data - The json object to convert to excel file.
 * @param filename - The name of the excel file. (default: file)
 */
export async function exportToExcel<T = any>({
  data = [],
  filename = "reporte",
  columnsMap = {},
  title = "Reporte",
  showHead = true,
}: ExportProps<T>): Promise<void> {
  if (data.length === 0) {
    console.warn("No hay datos para exportar.")
    return
  }

  // Filtrar solo las columnas definidas en columnsMap
  const keys = Object.keys(columnsMap)
  const headers = Object.values(columnsMap)

  // Transformar los datos según columnsMap
  const formattedData = data.map((row) => {
    const newRow: Record<string, any> = {}
    keys.forEach((key) => {
      let value = row[key as never] as string

      // Si es una fecha ISO, formatearla
      if (
        typeof value === "string" &&
        value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
      ) {
        value = new Date(value).toLocaleDateString()
      }

      newRow[columnsMap[key]] = value
    })
    return newRow
  })

  // Crear la hoja de cálculo con los datos transformados
  const worksheet = XLSX.utils.json_to_sheet(formattedData)

  // Ajustar ancho de columnas
  const colWidths = keys.map((key) => ({
    wch: Math.max(columnsMap[key]?.length || 10, 15),
  }))

  worksheet["!cols"] = colWidths

  // Crear el libro de trabajo y agregar la hoja
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte")

  // Escribir el archivo Excel
  const excelBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" })
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })

  // Guardar el archivo
  saveAs(blob, `${filename}.xlsx`)
}

export async function exportToPDF<T = any>({
  data = [],
  filename = "reporte",
  columnsMap,
  orientation = "portrait",
  title = "Reporte",
  showHead,
}: ExportProps<T>): Promise<void> {
  const doc = new jsPDF({
    orientation,
    unit: "mm",
    format: "a4",
  })

  const currentDate = new Date().toLocaleDateString("es-ES")

  doc.setFontSize(14)
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const titleWidth = doc.getTextWidth(title)
  doc.text(title, (pageWidth - titleWidth) / 2, 15)

  doc.setFontSize(10)
  doc.text(`Generado por: ${getSessionInfo().name}`, 10, 30)
  doc.text(`Fecha: ${currentDate}`, pageWidth - 50, 30)

  if (data.length === 0) {
    doc.text("No hay datos disponibles", 14, 25)
    doc.save(filename)
    return
  }

  const headers = columnsMap
    ? Object.values(columnsMap)
    : Object.keys(data?.[0] ?? {}).map((key) => key.toUpperCase())

  const body = data.map((row) =>
    (columnsMap ? Object.keys(columnsMap) : Object.keys(row ?? {})).map(
      (key) =>
        moment(row[key as never]).isValid()
          ? formatter({
              value: row[key as never],
              format: "long_date",
            })
          : (row[key as never] ?? "N/A")
    )
  )

  const footerText = `Reporte generado por: ${getSessionInfo().name}`

  autoTable(doc, {
    head: [headers as string[]],
    body,
    startY: 25,
    styles: { fontSize: 8, cellPadding: 2 },
    margin: { left: 10, right: 10 },
    theme: "striped",
    showHead,
    didDrawPage: () => {
      doc.setFontSize(8)
      doc.text(footerText, 10, pageHeight - 10)
      doc.text(`Página ${1}`, pageWidth - 20, pageHeight - 10)
    },
  })

  doc.save(filename)
}

export async function exportToCSV<T = any>({
  data = [],
  filename = "reporte",
  columnsMap = {},
  showHead = true,
}: ExportProps<T>) {
  if (data.length === 0) {
    console.warn("No hay datos para exportar.")
    return
  }

  // Obtener solo las claves definidas en columnsMap
  const keys = Object.keys(columnsMap)
  const headers = Object.values(columnsMap)

  const rows = data.map((row) =>
    keys
      .map((key) => {
        let value = row[key as never] as string

        if (
          typeof value === "string" &&
          value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
        ) {
          value = new Date(value).toLocaleDateString()
        }

        return `"${value ?? ""}"`
      })
      .join(",")
  )

  const csvContent = [showHead ? headers.join(",") : "", ...rows].join("\n")

  const blob = new Blob([`\ufeff${csvContent}`], {
    type: "text/csv;charset=utf-8;",
  })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function generateReceiptsPdf(receipts: Receipt[]) {
  const pdf = new jsPDF("p", "pt", "a4")

  for (let i = 0; i < receipts.length; i++) {
    // Crear un contenedor temporal
    const wrapper = document.createElement("div")
    wrapper.innerHTML = receipts[i].content
    wrapper.style.width = "100mm" // Tamaño A4
    wrapper.style.padding = "170mm"
    wrapper.style.padding = "10mm"
    wrapper.style.boxSizing = "border-box"
    wrapper.style.backgroundColor = "white"
    wrapper.style.color = "black"
    wrapper.style.fontSize = "12px"
    wrapper.style.fontFamily = "Arial, sans-serif"

    document.body.appendChild(wrapper)

    // Convertir a imagen
    const canvas = await html2canvas(wrapper, {
      scale: 2,
    })
    const imgData = canvas.toDataURL("image/png")

    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    if (i > 0) pdf.addPage()
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)

    document.body.removeChild(wrapper)
  }

  pdf.save("recibos.pdf")
}
