package com.zkiss.proman.controller;

import com.zkiss.proman.modal.Card;
import com.zkiss.proman.modal.DTO.cardDTO.CardCreateRequest;
import com.zkiss.proman.modal.DTO.cardDTO.CardDeleteRequest;
import com.zkiss.proman.modal.DTO.cardDTO.CardsBoardColumnUpdateRequest;
import com.zkiss.proman.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/card")
public class CardController {

    private CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createCard(@RequestBody CardCreateRequest createRequest){
        if(createRequest.hasNoNullField()){
            cardService.registerCard(createRequest);
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(401).body("Missing Card Information");
        }
    }

    @PutMapping("/update-single-card")
    public void updateCard(@RequestBody Card card){
        cardService.update(card);
    }

    @PutMapping("/update-cards")
    public void updateCardsBoardColumn(@RequestBody CardsBoardColumnUpdateRequest updateRequest){
        cardService.update(updateRequest);
    }

    @DeleteMapping
    public void deleteCard(@RequestBody CardDeleteRequest deleteRequest){
        cardService.delete(deleteRequest.getCardId());
    }

}
