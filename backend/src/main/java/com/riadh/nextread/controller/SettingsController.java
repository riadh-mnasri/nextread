package com.riadh.nextread.controller;

import com.riadh.nextread.dto.FocusUpdateRequest;
import com.riadh.nextread.model.Settings;
import com.riadh.nextread.service.SettingsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    private final SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping
    public Settings get() {
        return settingsService.get();
    }

    @PutMapping
    public Settings update(@RequestBody FocusUpdateRequest request) {
        return settingsService.updateFocus(request.currentFocusCategory());
    }
}
