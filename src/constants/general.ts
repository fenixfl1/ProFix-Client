export const states: Record<string, { label: string; color: string }> = {
  A: { label: "Activo", color: "green" },
  I: { label: "Inactivo", color: "gray" },
  P: { label: "Pendiente", color: "blue" },
}

export const priorities: Record<string, { label: string; color: string }> = {
  H: { label: "Alta", color: "#ff4d4f" },
  M: { label: "Media", color: "#ffa940" },
  L: { label: "Baja", color: "#73d13d" },
}

export const statusMap: Record<string, { label: string; color: string }> = {
  P: { label: "Pendiente", color: "#faad14" }, // gold-6 (advertencia)
  R: { label: "Resuelto", color: "#52c41a" }, // green-6 (éxito)
  I: { label: "Iniciado", color: "#1890ff" }, // blue-6 (proceso)
  N: { label: "No Resuelto", color: "#f5222d" }, // red-6 (error)
  E: { label: "Entregado", color: "#13c2c2" }, // cyan-6 (estado completado)
}
