#! /usr/bin/env zsh

startDev() {
    pm2 start pm2-ecosystem.json --env development
}

startProd() {
    pm2 start pm2-ecosystem.json --env production
}

stopProcess() {
    pm2 delete all
}

trap stopProcess EXIT

while [[ $# -gt 0 ]]; do
    PARAM="$1"
    case "$PARAM" in
    --dev)
        startDev
        echo "Dev project started"
        pm2 monit
        ;;
    --prod)
        startProd
        echo "Project started"
        pm2 monit
        ;;
    *)
        echo "Unknown option '$PARAM'"
        exit 1
        ;;
    esac
    shift
done
    