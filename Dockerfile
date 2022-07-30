# syntax=docker/dockerfile:1
FROM ghcr.io/foundry-rs/foundry:latest
CMD ["anvil --host 0.0.0.0 --fork-url ${ANVIL_FORK_URL} --fork-block-number ${ANVIL_BLOCK_NUMBER}"]