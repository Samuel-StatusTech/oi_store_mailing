import { formatCNPJ } from "./formatCNPJ"
import { formatCPF } from "./formatCPF"

export const formatCPFandCNPJ = (v: string) => {
    const value = v.replace(/\D/g, "")

    const isCPF = value.length <= 11

    return isCPF ? formatCPF(value) : formatCNPJ(value)
}
