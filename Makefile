
dev:
	docker compose -f docker-compose.dev.yaml up --build

prod:
	docker compose -f docker-compose.prod.yml up --build -d

down_dev:
	docker compose -f docker-compose.dev.yaml down --volumes

down_prod:
	docker compose -f docker-compose.prod.yml down --volumes

clean:
	docker compose down --volumes

fclean:
	docker compose down --volumes --rmi all

git: git add . && git commit -m "$(date)" && git push

.PHONY: dev prod down clean fclean