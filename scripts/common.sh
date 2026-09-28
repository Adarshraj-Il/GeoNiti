#!/usr/bin/env bash
#
# scripts/common.sh — Shared UI helpers and environment setup for GeoNiti.
# Source this from start_local.sh:
#   SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
#   source "${SCRIPT_DIR}/scripts/common.sh"
#
# Provides: RED, GREEN, YELLOW, BLUE, PURPLE, CYAN, BOLD, DIM, NC
#           ICON_*, hr(), step(), step_done(), step_err(), info(), warn(),
#           fail(), setup_env(), banner()
#

# ─── Colors ─────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

# ─── Icons ───────────────────────────────────────────────────────────────────
ICON_INFO="${BLUE}ℹ${NC}"
ICON_OK="${GREEN}✔${NC}"
ICON_WARN="${YELLOW}⚠${NC}"
ICON_ERR="${RED}✖${NC}"
ICON_WAIT="${CYAN}⚙${NC}"
ICON_ROCKET="${PURPLE}🚀${NC}"

# ─── UI Helpers ──────────────────────────────────────────────────────────────
hr()        { echo -e "${DIM}────────────────────────────────────────────────────────────────${NC}"; }
step()      { echo -ne "  ${ICON_WAIT}  $1... "; }
step_done() { echo -e "\r  ${ICON_OK}  $1    "; }
step_err()  { echo -e "\r  ${ICON_ERR}  $1    "; [[ -n "${2:-}" ]] && echo -e "      ${RED}└─ $2${NC}"; }
info()      { echo -e "  ${ICON_INFO}  $*"; }
warn()      { echo -e "  ${ICON_WARN}  ${YELLOW}$*${NC}"; }
fail()      { echo -e "  ${ICON_ERR}  ${RED}$1${NC}" >&2; [[ -n "${2:-}" ]] && echo -e "  ${DIM}└─ ${2}${NC}" >&2; exit 1; }

# ─── Environment Setup ───────────────────────────────────────────────────────
setup_env() {
    export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin
    export DOCKER_BUILDKIT=1
    export BUILDX_NO_DEFAULT_ATTESTATIONS=1
}

# ─── Banner ──────────────────────────────────────────────────────────────────
banner() {
    clear 2>/dev/null || true
    echo -e "${CYAN}${BOLD}"
    echo "   ██████╗ ███████╗ ██████╗ ███╗   ██╗██╗████████╗██╗"
    echo "  ██╔════╝ ██╔════╝██╔═══██╗████╗  ██║██║╚══██╔══╝██║"
    echo "  ██║  ███╗█████╗  ██║   ██║██╔██╗ ██║██║   ██║   ██║"
    echo "  ██║   ██║██╔══╝  ██║   ██║██║╚██╗██║██║   ██║   ██║"
    echo "  ╚██████╔╝███████╗╚██████╔╝██║ ╚████║██║   ██║   ██║"
    echo "   ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝   ╚═╝   ╚═╝"
    echo -e "${NC}"
    echo -e "                                 ${DIM}GeoNiti — Local Dev${NC}"
    echo ""
}
