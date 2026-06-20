package com.riadh.nextread.service;

import com.riadh.nextread.dto.OpenLibraryResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class CoverService {

    private static final Logger log = LoggerFactory.getLogger(CoverService.class);
    private static final Pattern EDITION_SUFFIX = Pattern.compile("\\s*[\\(\\[]\\s*\\d+\\s*(?:e|ère|ème)?\\s*éd(?:ition)?\\.?[^)\\]]*[\\)\\]]", Pattern.CASE_INSENSITIVE);

    private final RestClient restClient = RestClient.create();

    public Optional<String> findCoverUrl(String title, String author) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString("https://openlibrary.org/search.json")
                .queryParam("title", cleanTitle(title))
                .queryParam("limit", 1)
                .queryParam("fields", "cover_i");

        if (author != null && !author.isBlank()) {
            builder.queryParam("author", author);
        }

        URI uri = builder.build().encode().toUri();

        try {
            OpenLibraryResponse response = restClient.get()
                    .uri(uri)
                    .retrieve()
                    .body(OpenLibraryResponse.class);

            if (response == null || response.docs() == null || response.docs().isEmpty()) {
                return Optional.empty();
            }

            return Optional.ofNullable(response.docs().get(0).coverId())
                    .map(coverId -> "https://covers.openlibrary.org/b/id/" + coverId + "-L.jpg");
        } catch (Exception e) {
            log.warn("Échec de la récupération de couverture pour '{}': {}", title, e.getMessage());
            return Optional.empty();
        }
    }

    private String cleanTitle(String title) {
        return EDITION_SUFFIX.matcher(title).replaceAll("").trim();
    }
}
