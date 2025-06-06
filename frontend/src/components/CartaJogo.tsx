import React from "react";
import "./CartaJogo.css";

interface CartaJogoProps {
  imagem: string;
  nome: string;
  virada: boolean;
  encontrada: boolean;
  correta?: boolean; // NOVO
  onClick: () => void;
}

export const CartaJogo: React.FC<CartaJogoProps> = ({
  imagem,
  nome,
  virada,
  encontrada,
  correta,
  onClick,
}) => {
  const path = `/src/assets/Imagens sem fundo/` + imagem;
  console.log(path);
  return (
    <div
      className={`carta-jogo ${virada || encontrada ? "virada" : ""} ${
        correta ? "correta" : ""
      }`}
      onClick={onClick}
      style={{ pointerEvents: encontrada ? "none" : "auto" }}
    >
      <div className="carta-jogo-inner">
        <div className="carta-jogo-front">?</div>
        <div className="carta-jogo-back">
          <div className="carta-jogo-img-bg">
            <img src={path} alt={nome} className="carta-jogo-img" />
          </div>
          <div className="carta-jogo-nome">{nome}</div>
        </div>
      </div>
    </div>
  );
};

export default CartaJogo;
